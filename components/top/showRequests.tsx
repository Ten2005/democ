"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState, useEffect } from "react"
import { supabase } from "@/supabase"

interface Request {
  title: string;
  description: string;
}

export default function ShowRequests() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase.from('requests').select('request');
      if (error) {
        alert("Error fetching requests:" + error.message);
      } else {
        setRequests(data.map((request: { request: Request }) => ({
            title: request.request.title,
            description: request.request.description
        })));
      }
    };
    fetchRequests();
  }, []);

  return (
    <Dialog>
        <DialogTrigger className="hover:text-gray-500">Show requests</DialogTrigger>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>Requests</DialogTitle>
            <DialogDescription>
            All the requests are shown here.
            </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
            {requests.map((request, index) => (
            <Accordion type="single" collapsible key={index}>
                <AccordionItem value="item-1">
                <AccordionTrigger>{request.title}</AccordionTrigger>
            <AccordionContent>
                {request.description}
            </AccordionContent>
            </AccordionItem>
        </Accordion>
        ))}
        </div>
        </DialogContent>
    </Dialog>
  );
}
