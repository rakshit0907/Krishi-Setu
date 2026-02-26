import { NextResponse } from "next/server";
import { treatments } from "@/lib/treatments";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageBase64 } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const response = await fetch(
      "https://rakshitpandey24-plantdiseasedetection.hf.space/run/predict",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [imageBase64] }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: `Hugging Face API error: ${err}` },
        { status: 500 }
      );
    }

    const hfResult = await response.json();
    const prediction = hfResult.data[0];
    const label = prediction.label;
    const score = prediction.score;

    const treatment = treatments[label] || {
      english: "No treatment advice available.",
      hindi: "उपचार सलाह उपलब्ध नहीं है।",
    };

    const diagnosis = {
      healthStatus: label.replace("___", " "),
      healthScore: Math.round(score * 100),
      diseases: [
        {
          name: label.replace("___", " "),
          severity: score > 0.8 ? "high" : score > 0.5 ? "medium" : "low",
          description: "Auto-detected crop disease from image.",
          treatment: treatment.english,
        },
      ],
      pests: [],
      nutrientDeficiencies: [],
      recommendations: [treatment.english, treatment.hindi],
      traditionalRemedies: ["Neem spray", "Cow urine solution"],
      preventiveMeasures: [
        "Rotate crops",
        "Use resistant varieties",
        "Maintain spacing",
      ],
      urgency: score > 0.8 ? "immediate" : score > 0.5 ? "soon" : "routine",
      summary: `Detected ${label.replace("___", " ")} with confidence ${Math.round(
        score * 100
      )}%.`,
    };

    return NextResponse.json({ diagnosis });
  } catch (error: any) {
    console.error("Crop doctor error:", error);
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}