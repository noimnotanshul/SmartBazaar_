import { supabase } from "./supabase"

export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  })
  if (error) throw error

  if (data.user) {
    await supabase.from("users").upsert({
      id: data.user.id,
      email,
      name,
      coins: 50,
      role: "customer",
    })
  }
  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
