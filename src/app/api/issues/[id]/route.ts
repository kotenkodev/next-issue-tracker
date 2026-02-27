import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../prisma/client";
import { patchIssueSchema } from "@/app/validationSchemas";
import authOptions from "../../auth/authOptions";
import { getServerSession } from "next-auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();
	const { id } = await params;
	const validation = patchIssueSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json({ error: validation.error.format() }, { status: 400 });
	}

	const { assignedUserId, title, description, status } = validation.data;
	if (assignedUserId) {
		const user = await prisma.user.findUnique({ where: { id: assignedUserId } });
		if (!user) {
			return NextResponse.json({ error: "Assigned user not found" }, { status: 404 });
		}
	}

	const issue = await prisma.issue.findUnique({ where: { id } });
	if (!issue) {
		return NextResponse.json({ error: "Issue not found" }, { status: 404 });
	}

	const updatedIssue = await prisma.issue.update({
		where: { id },
		data: {
			title,
			description,
			status,
			assignedUser: assignedUserId ? { connect: { id: assignedUserId } } : { disconnect: true },
		},
	});

	return NextResponse.json({ updatedIssue }, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const session = await getServerSession(authOptions);
	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { id } = await params;
	const issue = await prisma.issue.findUnique({ where: { id } });

	if (!issue) {
		return NextResponse.json({ error: "Issue not found" }, { status: 404 });
	}

	await prisma.issue.delete({ where: { id } });
	return NextResponse.json({ message: "Issue deleted successfully" }, { status: 200 });
}
