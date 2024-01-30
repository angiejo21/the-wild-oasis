import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gmtqmhfvhxcqydcqvrxn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtdHFtaGZ2aHhjcXlkY3F2cnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NDU5ODIsImV4cCI6MjAyMjEyMTk4Mn0.UJB2IRhd04ONbrp-PxeaBP-ancFpgSZ2KtLdrmrQHF8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
