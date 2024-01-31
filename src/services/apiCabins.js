import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  console.log(1, hasImagePath);
  //0 create name and path for the image
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  console.log(2, imageName, imagePath);
  //1 create/edit the cabin
  let query = supabase.from("cabins");
  //A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //B)EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  console.log(3, query);

  const { data, error } = await query.select().single();
  console.log(4, data);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //if successful upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3 Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
