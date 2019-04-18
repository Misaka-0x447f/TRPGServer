export interface InitialPointDef {
  label: string;
  text: string;
  inherited: number;
}

interface FreePointDef {
  totalFree: number;
}

export interface PointDef {
  initialPoint: InitialPointDef[];
  freePoint: FreePointDef;
}
