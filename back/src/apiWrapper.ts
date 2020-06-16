import axios, {AxiosInstance, AxiosResponse} from "axios";

const API_BASE_URL = "https://api.exchangeratesapi.io/";

type wrapperResult = {
    data: any | null,
    error: any | null
};

class ApiWrapper
{
    private readonly instance: AxiosInstance;

    public constructor()
    {
        this.instance = axios.create({
            baseURL: API_BASE_URL
        });
    };

    public async convert(from: string, to: string): Promise<wrapperResult>
    {
        let uri = `/latest?base=${from}&symbols=${to}`;

        try {
            return this.success(await this.instance.get(uri));
        } catch (err) {
            return this.failure(err);
        }
    };

    public async getLatest(): Promise<wrapperResult>
    {
        try {
            return this.success(await this.instance.get("/latest"));
        } catch (err) {
            return this.failure(err);
        }
    };

    public async getLatestByBase(base: string): Promise<wrapperResult>
    {
        try {
            return this.success(await this.instance.get(`/latest?base=${base}`));
        } catch (err) {
            return this.failure(err);
        }
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
                error: error.response.statusText
            }
        };
    };
};

export default ApiWrapper;