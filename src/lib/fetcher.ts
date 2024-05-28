import { Article, ArticleCreate, ArticleGet } from "@/type/article";
import axios from "axios";

interface Data {
  articles?: Article[];
  article?: Article;
}
export interface Resonse {
  message: string;
  success: boolean;
  data: Data;
}

type ParamData = ArticleCreate | ArticleGet;

const apiUrl = "http://192.168.0.100:8080/nover/article/";

export default async function makeApiRequest(
  endpoint: string,
  method: string,
  data?: ParamData
): Promise<Resonse> {
  try {
    const response = await axios<Resonse>({
      method,
      url: apiUrl + endpoint,
      data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
