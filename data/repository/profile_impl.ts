import { supabaseGetInitProfile, supabaseGetProfileDetail } from "../source/network/profile_supabase"

export const getProfileDetail = async(uuid: string) => {
    const { data, error } = await supabaseGetProfileDetail(uuid)
    return { data, error }
}

export const getInitProfile = async(uuid: string | undefined) => {
    const { data, error } = await supabaseGetInitProfile(uuid)
    return { data, error }
}