import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../prisma/client";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const validation = createIssueSchema.safeParse(body);
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
		},
	});
	return NextResponse.json({ issue }, { status: 201 });
}
