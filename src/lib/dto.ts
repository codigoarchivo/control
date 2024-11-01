'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { generatePath } from '@/utils/generatePath';
import { ISessionBase } from '@/interfaces/api.interface';
import { getSome } from './getSome';
import { auth } from '@/auth';

const canSeeIfUser = (viewer: ISessionBase | undefined) => viewer?.is_user;
const canSeeIfAdmin = (viewer: ISessionBase | undefined) => viewer?.is_admin;

export async function getProfileAbility(talent: number) {
  try {
    const session = await auth();
    const currentProfile = session?.user?.profile as ISessionBase | undefined;
    const accessToken = session?.user?.accessToken;
    const locale = cookies().get('NEXT_LOCALE')?.value || 'en';

    if (!currentProfile) {
      return redirect(generatePath({ locale, link: `/auth/login?redirectTo=/talents/${talent}` }));
    }

    const abilities = await getSome({
      token: accessToken || "",
      params: "",
      base: "/abilities_search/",
      id: talent ? `${talent}/` : "",
    });

    const currentAbility = abilities.data;

    const profile = {
      id: currentAbility.id,
      phone: canSeeIfAdmin(currentProfile) ? currentAbility.phone : null,
      email: canSeeIfAdmin(currentProfile) ? currentAbility.user?.email : null,
      get_full_name: canSeeIfAdmin(currentProfile) ? currentAbility.user?.get_full_name : null,
      profile_image: canSeeIfAdmin(currentProfile) ? currentAbility.user?.profile_image : null,
      talent: canSeeIfUser(currentProfile) || canSeeIfAdmin(currentProfile) ? currentAbility.talent : null,
      occupation: canSeeIfUser(currentProfile) || canSeeIfAdmin(currentProfile) ? currentAbility.occupation : null,
      description: canSeeIfUser(currentProfile) || canSeeIfAdmin(currentProfile) ? currentAbility.description : null,
      experience_level: canSeeIfUser(currentProfile) || canSeeIfAdmin(currentProfile) ? currentAbility.experience_level : null,
      location: canSeeIfAdmin(currentProfile) ? currentAbility.location : null,
      start_date: canSeeIfUser(currentProfile) || canSeeIfAdmin(currentProfile) ? currentAbility.start_date : null,
      certifications: canSeeIfAdmin(currentProfile) ? currentAbility.certifications : null,
      number_of_likes: canSeeIfUser(currentProfile) || canSeeIfAdmin(currentProfile) ? currentAbility.number_of_likes : null,
    };

    return profile;
  } catch (error) {
    console.error('Error al obtener la habilidad del perfil:', error);
  }
}
