import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../prisma/client";
import { issueSchema } from "@/app/validationSchemas";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const validation = issueSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(
			{ error: validation.error.format() },
			{
				status: 400,
			},
		);
	}
	const issue = await prisma.issue.create({
		data: {
			title: validation.data.title,
			description: validation.data.description,
			status: validation.data.status || "OPEN",
		},
	});
	return NextResponse.json({ issue }, { status: 201 });
}
