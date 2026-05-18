# CRM Lead Management System

A CRM (Customer Relationship Management) system designed to help businesses collect, manage, and track customer leads through different stages until conversion.

## Project Overview

The system allows interested customers (leads) to submit their information through a public form. Administrators can log in and manage those leads by tracking interactions, scheduling follow-ups, and updating lead status.

---

## Workflow

### Lead Submission
- The root route (`/`) contains a form where interested customers can submit their information.
- Once submitted, a new lead record is created in the system.
- Every newly created lead is assigned an initial status of:

```text
New
