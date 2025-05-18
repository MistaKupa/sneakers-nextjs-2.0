import ContactInformation from "./profileContactInfo/ContactInformation";
import PasswordSettings from "./passwordSettings/PasswordSettings";
import ProfileInformation from "./profileInformationSettings/ProfileInformation";
import ProfilePicture from "./profilePictureSettings/ProfilePictureSettings";

export default async function AccSettings() {
  // const supabase = await createServerClientInstance();

  // const {
  //   data: {
  //     user: { email, id, phone },
  //   },
  //   error: userDataError,
  // } = await supabase.auth.getUser();

  // if (userDataError || !id) {
  //   throw new Error("Authorization is missing");
  // }

  // const {
  //   data: { birth_date, gender, display_name },
  //   error: userInfoError,
  // } = await supabase
  //   .from("profiles")
  //   .select("birth_date, gender, display_name")
  //   .eq("user_id", id)
  //   .single();

  // if (userInfoError) {
  //   console.error("SUPABASE ERROR:", userInfoError);
  //   throw new Error("Failed to fetch user profile info.");
  // }

  return (
    <div className="w-full xl:w-5/6 flex flex-col items-center gap-10">
      <h3 className="text-dark-500 text-3xl font-semibold place-self-start">
        Account Settings
      </h3>
      <div className="w-full flex flex-col justify-center items-center gap-28">
        <ProfilePicture />
        <PasswordSettings />
        <ProfileInformation />
        <ContactInformation />
      </div>
    </div>
  );
}
