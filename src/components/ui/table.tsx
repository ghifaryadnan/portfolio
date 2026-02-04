import * as React from "react"
import { cn } from "@/lib/utils"

function TableContainer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-container"
      className={cn("rounded border border-zinc-200 dark:border-zinc-800 overflow-auto", className)}
      {...props}
    />
  )
}

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <table
      data-slot="table"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-head"
      className={cn("bg-zinc-50 dark:bg-zinc-900", className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(className)}
      {...props}
    />
  )
}

function TableHeaderCell({
  className,
  align = "left",
  ...props
}: React.ComponentProps<"th"> & { align?: "left" | "center" | "right" }) {
  const alignClass =
    align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"
  return (
    <th
      data-slot="table-header-cell"
      className={cn(alignClass, "px-3 py-2", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("divide-y divide-zinc-200 dark:divide-zinc-800", className)}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn("px-3 py-2", className)}
      {...props}
    />
  )
}

export {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
}
