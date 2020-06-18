import axios, {AxiosInstance, AxiosResponse} from "axios";

const API_BASE_URL = "https://api.exchangeratesapi.io/";
const API_BTC_URL = "https://blockchain.info/";

type wrapperResult = {
    data: any | null,
    error: any | null
};

class ApiWrapper
{
    private readonly instance: AxiosInstance;
    private readonly btcInstance: AxiosInstance;

    public constructor()
    {
        this.instance = axios.create({
            baseURL: API_BASE_URL
        });

        this.btcInstance = axios.create({
            baseURL: API_BTC_URL
        });
    };

    public async convert(from: string, to: string, value: number): Promise<wrapperResult>
    {
        if (from === "BTC" || to === "BTC")
            return this.fetchBtc(from, to, value);

        let response = await this.fetch(`/latest?base=${from}&symbols=${to}`);

        if (response.error != null)
            return response;
        response.data = Number(response.data.rates[to]) * value;
        return response;
    };

    public async getLatest(): Promise<wrapperResult>
    {
        return await this.fetch("/latest");
    };

    public async getLatestByBase(base: string): Promise<wrapperResult>
    {
        return await this.fetch(`/latest?base=${base}`);
    };

    private async fetch(uri: string): Promise<wrapperResult>
    {
        try {
            return this.success(await this.instance.get(uri));
        } catch (err) {
            return this.failure(err);
        }
    };

    private async fetchBtc(from: string, to: string, value: number): Promise<wrapperResult>
    {
        let currency = from == "BTC" ? to : from;
        let uri = `tobtc?currency=${currency}&value=1`;
        let response: string;
        let result: number;

        try {
            response = (await this.btcInstance.get(uri)).data;
        } catch(err) {
            return this.failure(err);
        }
        result = Number(response);
        if (from == "BTC")
            result = 1 / result;
        result *= value;
        return {
            data: result,
            error: null
        };
    };

    private success(response: AxiosResponse): wrapperResult
    {
        return {
            data: response.data,
            error: null
        };
    };

    private failure(error: any): wrapperResult
    {
        return {
            data: null,
            error: {
                code: error.response.status,
                response: error.response.statusText
            }
        };
    };
};

export default ApiWrapper;