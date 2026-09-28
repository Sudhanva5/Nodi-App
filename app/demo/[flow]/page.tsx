import DemoPlayer from "./DemoPlayer";

export function generateStaticParams() {
  return ["report", "track", "nearby", "a11y"].map((flow) => ({ flow }));
}

export default async function DemoPage({ params, searchParams }: { params: Promise<{ flow: string }>; searchParams: Promise<{ frame?: string }> }) {
  const { flow } = await params;
  const { frame } = await searchParams;
  return <DemoPlayer flow={flow} frame={frame !== "0"} />;
}
