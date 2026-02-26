import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { TraditionalKnowledgeSubmission } from '@/types/advisory';

export async function POST(request: NextRequest) {
  try {
    const body: TraditionalKnowledgeSubmission = await request.json();
    const { district, crop, practice, benefit, season, source, submitted_by } = body;

    // Validate input
    if (!district || !crop || !practice || !benefit) {
      return NextResponse.json(
        { success: false, error: 'District, crop, practice, and benefit are required' },
        { status: 400 }
      );
    }

    // Insert traditional knowledge (unverified by default)
    const { data, error } = await supabase
      .from('traditional_knowledge')
      .insert({
        district,
        crop,
        practice,
        benefit,
        season: season || null,
        source: source || null,
        submitted_by: submitted_by || 'Anonymous',
        verified: false, // Must be verified by admin before appearing in advisory
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving traditional knowledge:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to save traditional knowledge' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        data,
        message: 'Traditional knowledge submitted successfully! It will be reviewed by our team before appearing in advisories.'
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Traditional knowledge API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve pending verifications (admin use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const verified = searchParams.get('verified');

    let query = supabase.from('traditional_knowledge').select('*');

    // Filter by verification status if specified
    if (verified !== null) {
      query = query.eq('verified', verified === 'true');
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching traditional knowledge:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch traditional knowledge' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );

  } catch (error) {
    console.error('Traditional knowledge GET API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT endpoint to verify traditional knowledge (admin use)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, verified } = body;

    if (!id || typeof verified !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'ID and verified status are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('traditional_knowledge')
      .update({ 
        verified,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating traditional knowledge:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update traditional knowledge' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        data,
        message: verified ? 'Practice verified successfully!' : 'Practice marked as unverified.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Traditional knowledge PUT API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
