"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function requireUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado.");
  return { supabase, user };
}

async function uploadImage(
  supabase: ReturnType<typeof createClient>,
  bucket: string,
  file: File
) {
  if (!file || file.size === 0) return null;
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(`Falha ao enviar imagem: ${error.message}`);
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function createPost(formData: FormData) {
  const { supabase } = await requireUser();
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const published = formData.get("published") === "on";
  const coverFile = formData.get("cover") as File;
  if (!title || !content) throw new Error("Título e conteúdo são obrigatórios.");
  const cover_url = await uploadImage(supabase, "blog-covers", coverFile);
  const slug = `${slugify(title)}-${Date.now().toString(36)}`;
  const { error } = await supabase.from("posts").insert({ slug, title, excerpt, content, category, cover_url, published });
  if (error) throw new Error(`Não foi possível salvar o post: ${error.message}`);
  revalidatePath("/blog");
  revalidatePath("/admin/dashboard/posts");
  redirect("/admin/dashboard/posts");
}

export async function deletePost(id: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(`Não foi possível remover o post: ${error.message}`);
  revalidatePath("/blog");
  revalidatePath("/admin/dashboard/posts");
}

export async function createTestimonial(formData: FormData) {
  const { supabase } = await requireUser();
  const name = String(formData.get("name") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const text = String(formData.get("text") || "").trim();
  const imageFile = formData.get("image") as File;
  if (!name || !text) throw new Error("Nome e depoimento são obrigatórios.");
  const image_url = await uploadImage(supabase, "testimonials", imageFile);
  const { error } = await supabase.from("testimonials").insert({ name, city, text, image_url });
  if (error) throw new Error(`Não foi possível salvar o depoimento: ${error.message}`);
  revalidatePath("/");
  revalidatePath("/admin/dashboard/depoimentos");
  redirect("/admin/dashboard/depoimentos");
}

export async function deleteTestimonial(id: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(`Não foi possível remover o depoimento: ${error.message}`);
  revalidatePath("/");
  revalidatePath("/admin/dashboard/depoimentos");
}

export async function createBeforeAfter(formData: FormData) {
  const { supabase } = await requireUser();
  const procedure = String(formData.get("procedure") || "").trim();
  const published = formData.get("published") === "on";
  const beforeFile = formData.get("before") as File;
  const afterFile = formData.get("after") as File;
  if (!procedure || !beforeFile?.size || !afterFile?.size) {
    throw new Error("Procedimento e as duas fotos (antes e depois) são obrigatórios.");
  }
  const before_url = await uploadImage(supabase, "before-after", beforeFile);
  const after_url = await uploadImage(supabase, "before-after", afterFile);
  const { error } = await supabase.from("before_after").insert({ procedure, before_url, after_url, published });
  if (error) throw new Error(`Não foi possível salvar o caso: ${error.message}`);
  revalidatePath("/resultados");
  revalidatePath("/admin/dashboard/antes-depois");
  redirect("/admin/dashboard/antes-depois");
}

export async function deleteBeforeAfter(id: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase.from("before_after").delete().eq("id", id);
  if (error) throw new Error(`Não foi possível remover o caso: ${error.message}`);
  revalidatePath("/resultados");
  revalidatePath("/admin/dashboard/antes-depois");
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
