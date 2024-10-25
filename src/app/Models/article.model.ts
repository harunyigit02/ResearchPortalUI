export interface Article {
    id: number;
    categoryId: number;
    title: string;
    description: string;
    content: string;
    publishedAt: Date;
    totalViews: number;
  }