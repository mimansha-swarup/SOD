export interface ICreateUserProps {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
  community?: string;
}
