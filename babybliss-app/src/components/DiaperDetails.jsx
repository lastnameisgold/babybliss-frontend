export default function DiaperDetails(props) {
  return (
    <>
      <h1>Diaper Details</h1>
      <p>{props.log}</p>
      <p>{props.diaper}</p>
      <p>{props.rash}</p>
      <p>{props.notes}</p>
    </>
  );
}
