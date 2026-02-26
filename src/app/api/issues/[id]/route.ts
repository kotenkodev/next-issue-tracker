import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../prisma/client";
import { issueSchema } from "@/app/validationSchemas";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const body = await req.json();
	const { id } = await params;
	const validation = issueSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json({ error: validation.error.format() }, { status: 400 });
	}

	const issue = await prisma.issue.findUnique({ where: { id } });
	if (!issue) {
		return NextResponse.json({ error: "Issue not found" }, { status: 404 });
	}

	const updatedIssue = await prisma.issue.update({
		where: { id },
		data: {
			title: validation.data.title,
			description: validation.data.description,
			status: validation.data.status,
		},
	});

	return NextResponse.json({ updatedIssue }, { status: 200 });
}
