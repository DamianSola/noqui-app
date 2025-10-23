import { NextRequest, NextResponse } from 'next/server';
import api from '@/lib/axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await api.post('/auth/register', body);
    
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { 
        message: error.response?.data?.message || 'Error en el registro',
        errors: error.response?.data?.errors 
      },
      { status: error.response?.status || 500 }
    );
  }
}