import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { FeedbackRequest } from '@/types/advisory';

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackRequest = await request.json();
    const { advisory_id, helpful, notes } = body;

    // Validate input
    if (!advisory_id || typeof helpful !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'Advisory ID and helpful status are required' },
        { status: 400 }
      );
    }

    // Insert feedback into database
    const { data, error } = await supabase
      .from('feedback')
      .insert({
        advisory_id,
        helpful,
        notes: notes || null,
        timestamp: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving feedback:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to save feedback' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );

  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve feedback statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const advisory_id = searchParams.get('advisory_id');

    if (!advisory_id) {
      return NextResponse.json(
        { success: false, error: 'Advisory ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .eq('advisory_id', advisory_id);

    if (error) {
      console.error('Error fetching feedback:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch feedback' },
        { status: 500 }
      );
    }

    const helpful = data.filter(f => f.helpful).length;
    const notHelpful = data.filter(f => !f.helpful).length;

    return NextResponse.json(
      { 
        success: true, 
        data: {
          total: data.length,
          helpful,
          notHelpful,
          feedback: data
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Feedback GET API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
