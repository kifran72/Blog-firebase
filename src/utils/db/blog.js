import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore();

const addInPost = async (post) => {
  if (post) {
    const posts = await addDoc(collection(db, "posts"), {
      id: post.user.uid,
      email: post.user.email,
      displayName: post.user.displayName,
      name: post.name,
      sport: post.sport,
    });

    const sallesResult = {
      id: posts.id,
      data: {
        email: post.user.email,
        displayName: post.user.displayName,
        name: post.name,
        sport: post.sport,
      },
    };

    return sallesResult;
  }
};
const modifyPosts = async (post) => {
  if (post) {
    // Create an initial document to update.
    const salles = doc(db, "posts", post.id);
    // update
    await updateDoc(salles, post);
  }
};

const deletePosts = async (post) => {
  if (post) {
    const posts = await deleteDoc(doc(db, "posts", post.id));
    return posts;
  }
};

const getPosts = async () => {
  const posts = [];
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    posts.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return posts;
};

export { addInPost, getPosts, modifyPosts, deletePosts };
