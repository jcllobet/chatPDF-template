export interface Source {
  title: string;
  snippet: string;
  link: string;
  isFamilyFriendly: boolean;
  displayUrl: string;
  deepLinks: Array<{ snippet: string; name: string; url: string }>;
  dateLastCrawled: string;
  cachedPageUrl: string;
  language: string;
  primaryImageOfPage?: {
    thumbnailUrl: string;
    width: number;
    height: number;
    imageId: string;
  };
  isNavigational: boolean;
}
