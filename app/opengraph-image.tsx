import { ImageResponse } from "next/og";
export const alt = "Visa Prepper — Practise before the real interview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{width:"100%",height:"100%",background:"#184b3c",color:"#fbf7f1",display:"flex",flexDirection:"column",justifyContent:"center",padding:80}}>
    <div style={{fontSize:32,marginBottom:45}}>Visa Prepper</div>
    <div style={{fontSize:68,fontWeight:700,lineHeight:1.12,maxWidth:990}}>Practise before the real interview.</div>
    <div style={{fontSize:28,marginTop:35}}>Six AI interviews. Ten document checks. $44 once.</div>
    <div style={{fontSize:22,marginTop:30}}>Preparation, not a promise of visa approval.</div>
  </div>,size);
}
