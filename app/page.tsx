import dynamic from "next/dynamic";
const BFIWorkspace = dynamic(() => import("@/components/BFIWorkspace"), { ssr: false, loading: () => <main style={{padding:40}}>Loading…</main> });
export default function Home(){return <BFIWorkspace/>;}
