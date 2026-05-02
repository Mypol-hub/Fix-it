function RequestForm() {
  return (
    <form>
      <input type="text" placeholder="Item name" />
      <textarea placeholder="Describe the problem"></textarea>
      <input type="text" placeholder="Your name" />
      <input type="text" placeholder="Phone number" />
      <input type="text" placeholder="Location" />
      <button type="submit">Submit Request</button>
    </form>
  );
}
export default RequestForm;
