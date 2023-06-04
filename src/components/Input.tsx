---
const { title, ...props } = Astro.props;
---

<div className="text-sm font-light min-w-fit">
  <label
    for="email-address-icon"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >{title}</label
  >
  <div className="relative">
    <div
      className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    >
      <div aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400">
        <i className={props.icon}></i>
      </div>
    </div>
    <input
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      {...props}
      required
      aria-required="true"
    />
  </div>
</div>
