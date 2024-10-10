export interface ItemPublicacao {
    id: number;
    titulo: string;
    url: string;
    tipoPublicacao: string;
    tags: string;
    dataPublicacao: string;
    dataRevisao: string;
}

export interface PublicacaoDTO {
    success: boolean;
    data: ItemPublicacao[];
    message: string;
}