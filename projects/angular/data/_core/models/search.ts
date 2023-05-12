export class Search {
  public identifier?: string;
  public searchTerm = '*';
  public itemsToShow = 20;
  public page = 1;
  public includePartialMatches = true;

  public orderBy?: any;
  public filters?: any;
  public facets?: any[];
}
