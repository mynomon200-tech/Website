'use client';
import type { PetId } from '@/lib/pets';
// Selbst gezeichnete 16x16-Pixel-Sprites, keine externen Assets nötig.
const sprites: Record<PetId, string[]> = {
  momo: [
    '................','...GG......GG...','..GGGG....GGGG..','..GDDG....GDDG..','..GGGGGGGGGGGG..','...GGGGGGGGGG...','..GGGGGGGGGGGG..','..GWWGGGGWWGGG..','..GKKGGGGKKGGG..','..GGGGPPGGGGGG..','...GGGPPGGGGG...','....GGGGGGGG....','.....GGGGGG.....','....GGG..GGG....','...GGGG..GGGG...','................'
  ],
  fluff: [
    '................','..BB........BB..','..BBB......BBB..','..BBBBBBBBBBBB..','..BBWWBBBBWWBB..','..BBBBBBBBBBBB..','..BBBBBBBBBBBB..','..BKKBBBBKKBBB..','..BBBBPPBBBBBB..','...BBBBBBBBBB...','....BBBBBBBB....','...BBBBBBBBBB...','..BBBBBBBBBBBB..','..BB..BBBB..BB..','.......BB.......','................'
  ],
  ember: [
    '................','..OO........OO..','..OOO......OOO..','..OOYY....YYOO..','...OOOOOOOOOO...','..OOOOOOOOOOOO..','..OOWOOOOOWOOO..','..OOKOOOOOKOOO..','..OOOOOPPOOOOO..','...OOOOOOOOOO...','....OOOOOOOO....','.....OOOOOO.....','....OOOOOOOO....','...OOO....OOO...','..OOOO....OOOO..','................'
  ]
};
const palettes: Record<PetId, Record<string, string>> = {
  momo: {G:'#75ca8a',D:'#39895a',W:'#fff5cf',K:'#253b39',P:'#ed8f9a'},
  fluff: {B:'#a4aef5',W:'#f0f1ff',K:'#28375c',P:'#f8a7ca'},
  ember: {O:'#ef985a',Y:'#ffd57f',W:'#fff1c9',K:'#4a3034',P:'#ad4a53'}
};
export function PetSprite({ pet, size = 168 }: { pet: PetId; size?: number }) {
 return <svg role="img" aria-label={`${pet} Pixel-Pet`} width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges">
  {sprites[pet].flatMap((line,y) => [...line].map((c,x) => c === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={palettes[pet][c]}/>))}
 </svg>;
}
