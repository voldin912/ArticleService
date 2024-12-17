import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicApiInstance } from '@/utils/axios';
import {IRole,IArticle } from '@/interfaces';
import { Shared } from 'react-redux';

type SharedDataState = {
    role_data: IRole[];
    article_data: IArticle;
};

const initialState: SharedDataState = {
    role_data: [],
    article_data: {
        cur_step: 0,
        id: 0,
        image: null,
        title: '',
        content: '',
        category: '',
        price: 0,
        nonfree: 0,
        created_by: 0,
        created_at: '',
    }
};

const fetchRoleData = createAsyncThunk('shared_data/fetchRoleData', async () => {
    const res = await publicApiInstance.get(`/data/role`);

    if (res.status === 200) {
        return res.data as IRole[];
    } else {
        return [];
    }
});

export const slice = createSlice({
    name: 'shared_data',
    initialState,
    reducers: {
        reset: () => initialState,
        setArticleStep: (state: SharedDataState, action:any) => {
            state.article_data = {
                ...state.article_data,
                cur_step: action.payload.cur_step
            };
        },
        setArticleData: (state: SharedDataState, action:any) => {
            state.article_data = action.payload.article_data
        },
        setArticleImage: (state: SharedDataState, action:any) => {
            state.article_data = {
                ...state.article_data,
                image: action.payload.image
            }
        },
        setArticleTitle: (state: SharedDataState, action:any) => {
            state.article_data = {
                ...state.article_data,
                title: action.payload.title
            }
        },
        setArticleContent: (state: SharedDataState, action:any) => {
            state.article_data = {
                ...state.article_data,
                content: action.payload.content
            }
        },
        setArticleCategory: (state: SharedDataState, action:any) => {
            state.article_data = {
                ...state.article_data,
                category: action.payload.category
            }
        },
        setArticlePrice: (state: SharedDataState, action:any) => {
            state.article_data = {
                ...state.article_data,
                price: action.payload.price
            }
        },
        setArticleNonFreeArea: (state: SharedDataState, action:any) => {
            state.article_data = {
                ...state.article_data,
                nonfree: action.payload.nonfree
            }
        },
        setArticleCreator: (state: SharedDataState, action:any) => {
            state.article_data = {
                ...state.article_data,
                created_by: action.payload.created_by
            }
        },
        setArticleCreatedAt: (state: SharedDataState, action:any) => {
            state.article_data = {
                ...state.article_data,
                created_at: action.payload.created_at
            }
        },
    },
    extraReducers: (builder:any) => {
        builder.addCase(fetchRoleData.fulfilled, (state: SharedDataState, action: any) => {
            state.role_data = action.payload as IRole[];
        });
    }
});

export const { reset, setArticleStep, setArticleData, setArticleImage, setArticleTitle, setArticleContent, setArticleCategory, setArticlePrice, setArticleNonFreeArea, setArticleCreator, setArticleCreatedAt} = slice.actions;
export { fetchRoleData,  };
export default slice.reducer;
