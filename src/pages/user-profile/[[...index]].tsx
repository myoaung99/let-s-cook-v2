import {UserProfile} from "@clerk/nextjs";
import styles from '@/styles/user-profile.module.css'
const UserProfilePage = () => (
    <div className={styles.container}>
        <UserProfile path="/user-profile" routing="path"/>
    </div>

);

export default UserProfilePage;