import { createClient } from "next-sanity";

const client = createClient({
  projectId: "q59x6qvq",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false
});

export default function IndexPage({ pets }) {
  return (
    <>
      <header>
        <h1>Sanity + Next.js</h1>
      </header>
      <main>
        <h2>Pets</h2>
        {pets.length > 0 && (
          <ul>
            {pets.map((pet) => (
              <li key={pet._id}>{pet?.name}</li>
            ))}
          </ul>
        )}
        {!pets.length > 0 && <p>No pets to show</p>}
        {pets.length > 0 && (
          <div>
            <pre>{JSON.stringify(pets, null, 2)}</pre>
          </div>
        )}
        {!pets.length > 0 && (
          <div>
            <div>¯\_(ツ)_/¯</div>
            <p>
              Your data will show up here when you've configured everything
              correctly
            </p>
          </div>
        )}
      </main>
    </>
  );
}

export async function getStaticProps() {
  // const pets = [
  //   {
  //     "_id": "09d413e8-ddff-4d81-8739-9c58185f25fc",
  //     "_rev": "qpwyF0fxEtz8eBjjOfPijy",
  //     "_type": "pet",
  //     "name": "Chandima",
  //     "_createdAt": "2023-04-26T02:04:58.455002130Z",
  //     "_updatedAt": "2023-04-26T02:04:57.735Z"
  //   }
  // ];

  const pets = await client.fetch(`*[_type == "pet"]`);

  return {
    props: {
      pets
    }
  };
}
