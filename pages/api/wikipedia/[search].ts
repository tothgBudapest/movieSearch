import type { NextApiRequest, NextApiResponse } from 'next';
import { WIKIPEDIA_BASE_URL, WIKIPEDIA_LINK_URL } from '../../../src/constants/app-url.constant';

type Data = {
    url: string;
    search: any;
};

const getUrl = (search: string) => {
    const params = {
        action: 'query',
        list: 'search',
        format: 'json',
        srsearch: search
    };
    return WIKIPEDIA_BASE_URL + '?origin=*&' + new URLSearchParams(params).toString();
};

const getResponseUrl = (pageId: number) => {
    return `${WIKIPEDIA_LINK_URL}${pageId}`;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { search } = req.query;
    fetch(getUrl(search as string))
        .then((response) => response.json())
        .then((response) => {
            const result = response.query.search[0];
            res.status(200).json({
                url: getResponseUrl(result?.pageid),
                search: result
            });
        })
        .catch((error) => console.log(error));
}
