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

export async function updateSiteImages(formData: FormData) {
  const { supabase } = await requireUser();
  const heroFile = formData.get("heroImage") as File | null;
  const aboutFile = formData.get("aboutImage") as File | null;

  if ((!heroFile || heroFile.size === 0) && (!aboutFile || aboutFile.size === 0)) {
    throw new Error("Selecione pelo menos uma imagem para atualizar.");
  }

  const updates: Record<string, string> = { id: "global", updated_at: new Date().toISOString() };

  if (heroFile?.size) {
    const heroUrl = await uploadImage(supabase, "site-assets", heroFile);
    if (heroUrl) updates.hero_image_url = heroUrl;
  }

  if (aboutFile?.size) {
    const aboutUrl = await uploadImage(supabase, "site-assets", aboutFile);
    if (aboutUrl) updates.about_image_url = aboutUrl;
  }

  const { error } = await supabase
    .from("site_settings")
    .upsert(updates, { onConflict: "id" });

  if (error) throw new Error(`Não foi possível atualizar as imagens: ${error.message}`);

  revalidatePath("/", "layout");
  revalidatePath("/admin/dashboard/imagens");
  redirect("/admin/dashboard/imagens?updated=1");
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
  const imageFile = formData.get("image") as File;
  if (!procedure || !imageFile?.size) {
    throw new Error("Procedimento e a imagem 1:1 são obrigatórios.");
  }
  const image_url = await uploadImage(supabase, "before-after", imageFile);
  const { error } = await supabase.from("before_after").insert({
    procedure,
    image_url,
    // Mantém compatibilidade com o schema antigo, que exigia estes campos.
    before_url: image_url,
    after_url: image_url,
    published,
  });
  if (error) throw new Error(`Não foi possível salvar o caso: ${error.message}`);
  revalidatePath("/");
  revalidatePath("/resultados");
  revalidatePath("/admin/dashboard/antes-depois");
  redirect("/admin/dashboard/antes-depois");
}

export async function seedBeforeAfterAcervo() {
  const { supabase } = await requireUser();
  const items = [
    ["Toxina botulínica", "botox-testa-01.webp", "/img/resultados/botox-testa-01.webp"],
    ["Facetas", "facetas-01.webp", "/img/resultados/facetas-01.webp"],
    ["Facetas", "facetas-02.webp", "/img/resultados/facetas-02.webp"],
    ["Rinomodelação", "rino-01.webp", "/img/resultados/rino-01.webp"],
    ["Rinomodelação", "rino-02.webp", "/img/resultados/rino-02.webp"],
    ["Rinomodelação", "rino-03.webp", "/img/resultados/rino-03.webp"],
    ["Rinomodelação", "rino-04.webp", "/img/resultados/rino-04.webp"],
    ["Rinomodelação", "rino-05.webp", "/img/resultados/rino-05.webp"],
  ] as const;

  let imported = 0;
  let errorMessage: string | null = null;

  try {
    const { data: storageFiles, error: storageError } = await supabase.storage
      .from("before-after")
      .list("", { limit: 100, offset: 0 });

    if (storageError) throw new Error(`Erro ao listar o bucket: ${storageError.message}`);

    const available = new Set((storageFiles ?? []).map((file) => file.name));
    const missing = items.map(([, filename]) => filename).filter((filename) => !available.has(filename));
    if (missing.length) {
      throw new Error(`Arquivos não encontrados: ${missing.join(", ")}`);
    }

    for (const [procedure, filename, legacyUrl] of items) {
      const { data: publicData } = supabase.storage.from("before-after").getPublicUrl(filename);
      const image_url = publicData.publicUrl;

      const { data: existing, error: readError } = await supabase
        .from("before_after")
        .select("id, image_url")
        .or(`image_url.eq.${legacyUrl},image_url.eq.${image_url}`)
        .limit(1);

      if (readError) throw new Error(`Erro ao consultar "${filename}": ${readError.message}`);

      const row = existing?.[0];
      if (row) {
        if (row.image_url !== image_url) {
          const { error: updateError } = await supabase
            .from("before_after")
            .update({ procedure, image_url, before_url: image_url, after_url: image_url, published: true })
            .eq("id", row.id);
          if (updateError) throw new Error(`Erro ao atualizar "${filename}": ${updateError.message}`);
          imported += 1;
        }
        continue;
      }

      const { error: insertError } = await supabase.from("before_after").insert({
        procedure,
        image_url,
        before_url: image_url,
        after_url: image_url,
        published: true,
      });
      if (insertError) throw new Error(`Erro ao inserir "${filename}": ${insertError.message}`);
      imported += 1;
    }
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Falha ao importar acervo do Storage:", error);
  }

  revalidatePath("/", "layout");
  revalidatePath("/resultados");
  revalidatePath("/admin/dashboard/antes-depois");

  if (errorMessage) {
    redirect(`/admin/dashboard/antes-depois?importError=${encodeURIComponent(errorMessage)}`);
  }
  redirect(`/admin/dashboard/antes-depois?imported=${imported}`);
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
