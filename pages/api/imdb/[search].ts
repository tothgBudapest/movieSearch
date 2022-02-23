import type { NextApiRequest, NextApiResponse } from 'next';
import { IMDB_BASE_URL, IMDB_LINK_URL, IMDB_API_KEY } from '../../../src/constants/app-url.constant';

type Data = {
    url?: string;
    search?: any;
};

const getUrl = (query: string | string[]) => {
    return `${IMDB_BASE_URL}/${IMDB_API_KEY}/${query}`;
};

const getResponseUrl = (pageId: number) => {
    return `${IMDB_LINK_URL}/${pageId}`;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { search } = req.query;

    fetch(getUrl(search))
        .then((response) => response?.json())
        .then((response) => {
            res.status(200).json({
                url: getResponseUrl(response?.results[0]?.id),
                search: response
            });
        })
        .catch((error) => console.log(error));
}
