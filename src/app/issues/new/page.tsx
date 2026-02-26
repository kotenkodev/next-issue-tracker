import { Button, TextArea, TextField } from "@radix-ui/themes";

const NewPageIssue = () => {
	return (
		<div className="space-y-3 max-w-xl">
			<TextField.Root placeholder="Title" />
			<TextArea placeholder="Description" />
			<Button>Save</Button>
		</div>
	);
};
export default NewPageIssue;
