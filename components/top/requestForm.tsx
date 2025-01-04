"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { supabase } from "@/supabase"

interface Request {
  title: string;
  description: string;
}


export default function RequestForm() {
  const [inputRequest, setInputRequest] = useState<Request>({title: "", description: ""});
  const [isPosting, setIsPosting] = useState(false);
  const [isPostingDone, setIsPostingDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting request:", inputRequest);
    setIsPosting(true);

    const { data, error } = await supabase
      .from('requests')
      .insert({ request: inputRequest });

    if (error) {
      console.error("Error posting data:", error);
      alert("Error posting data: " + error.message);
    } else {
      console.log("Data posted successfully:", data);
      alert("Data posted successfully");
      setIsPostingDone(true);
      setInputRequest({title: "", description: ""});
    }
    setIsPosting(false);
  }

  return (
    <Dialog>
        <DialogTrigger className="hover:text-gray-500">Request to join</DialogTrigger>
        <DialogContent>
            {isPostingDone
            ?
            <DialogHeader>
                <DialogTitle
                className="text-center"
                >
                    Posting done!
                </DialogTitle>
            </DialogHeader>
            :
            <>
            <DialogHeader>
                <DialogTitle>What do you want?</DialogTitle>
                <DialogDescription>
                    you can request app development and reach desired function.
                </DialogDescription>
            </DialogHeader>
            <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            >
                <Input
                name="title"
                placeholder="Title"
                className="w-full"
                value={inputRequest.title}
                onChange={(e) => setInputRequest({
                    ...inputRequest,
                    title: e.target.value
                })}
                disabled={isPosting}
                />
                <Textarea
                name="description"
                placeholder="Type your request here."
                className="w-full min-h-[100px]"
                value={inputRequest.description}
                onChange={(e) => setInputRequest({
                    ...inputRequest,
                    description: e.target.value
                })}
                disabled={isPosting}
                />
                <DialogFooter>
                    <Button
                    type="submit"
                    disabled={
                        inputRequest.title === ""
                        || inputRequest.description === ""
                        || isPosting
                        }>
                        Post
                    </Button>
                </DialogFooter>
            </form>
            </>
            }
        </DialogContent>
    </Dialog>
  );
}
