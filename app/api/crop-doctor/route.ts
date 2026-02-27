import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();
  const { crop, symptoms } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("crop_treatments")
    .select("recommendation")
    .eq("crop", crop)
    .eq("symptom", symptoms);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    crop,
    symptoms,
    recommendations: data?.map(d => d.recommendation) ?? ["No advisory found"]
  });
}