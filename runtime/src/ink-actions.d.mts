export type InkAction = {id: string; kind: 'write' | 'mark' | 'sketch'; section: string; at: number; duration: number};
export function inkActions(lesson: unknown): InkAction[];
export function inkOverlaps(lesson: unknown): [InkAction, InkAction][];
export function activeInkActions(lesson: unknown, time: number): InkAction[];
