"use client";
import { createIssueSchema } from "@/app/validationSchemas";
import { ErrorMessage, Spinner } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

type IssueForm = z.infer<typeof createIssueSchema>;

const NewPageIssue = () => {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	});
	const [error, setError] = useState<string | null>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		try {
			setIsSubmitted(true);
			const response = await axios.post("/api/issues", data).then((res) => res.data);
			console.log(response);
			router.push("/issues");
		} catch (error) {
			setIsSubmitted(false);
			setError("Failed to create issue. Please check your input and try again.");
		}
	});

	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root className="mb-5" color="red">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form onSubmit={onSubmit} className="space-y-3 max-w-xl">
				<TextField.Root placeholder="Title" {...register("title")} />
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name="description"
					control={control}
					render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>

				<Button disabled={isSubmitted}>Add New Issue{isSubmitted && <Spinner />}</Button>
			</form>
		</div>
	);
};
export default NewPageIssue;
