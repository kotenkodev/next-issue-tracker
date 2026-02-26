import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { prisma } from "@/../prisma/client";

const createIssueSchema = z.object({
	title: z.string().min(3).max(100),
	description: z.string().min(3).max(1000),
});

export async function POST(req: NextRequest) {
	const body = await req.json();
	const validation = createIssueSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(validation.error, {
			status: 400,
		});
	}
	const issue = await prisma.issue.create({
		data: {
			title: validation.data.title,
			description: validation.data.description,
		},
	});
	return NextResponse.json({ issue }, { status: 201 });
}
