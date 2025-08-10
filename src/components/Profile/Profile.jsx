import "./Profile.css";

function SideBar() {
  return (
    <aside className="profile__sidebar">
      <img
        className="profile__avatar"
        src="/assets/avatar.svg"
        alt="User avatar"
      />
      <p className="profile__username">Terrence Tegegne</p>
    </aside>
  );
}

function ClothesSection({ items = [] }) {
  return (
    <section className="profile__clothes">
      <div className="profile__clothes-header">
        <h2>My Items</h2>
        <button type="button" className="profile__add-btn">
          + Add Item
        </button>
      </div>
      <ul className="profile__list">
        {items.map((it) => (
          <li key={it._id} className="profile__card">
            {it.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Profile({ items = [] }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection items={items} />
    </div>
  );
}
