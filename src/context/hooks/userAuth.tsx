import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { firebase, auth } from '../../services/firebase'

type User = {
  id: string,
  name: string,
  avatar: string
}

export function UserAuth () {
  const history = useHistory()
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const { displayName, uid, photoURL } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

    if(result.user) {
      const { displayName, uid, photoURL } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
    
    history.push('/rooms/new')
  }

  return {
    user, setUser, signInWithGoogle
  }
}