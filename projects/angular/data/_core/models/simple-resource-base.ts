export enum AssetType {
  Image,
  Video,
}

export class SimpleResourceBase {
  id: string;
  publicId: string;
  normalisePublicId: string;
  folder: string;
  fileName: string;
  indexUrl: string;
  url: string;
  secureUrl: string;
  type?: AssetType;
}
