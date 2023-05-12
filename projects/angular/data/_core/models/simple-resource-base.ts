export enum AssetType {
  Image,
  Video,
}

export class SimpleResourceBase {
  public id: string;
  public publicId: string;
  public normalisePublicId: string;
  public folder: string;
  public fileName: string;
  public indexUrl: string;
  public url: string;
  public secureUrl: string;
  public type?: AssetType;
}
