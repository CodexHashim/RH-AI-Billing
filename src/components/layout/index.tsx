// import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd"
// import Header from "./header"

// const Layout = ({ children }: React.PropsWithChildren) => {
//   return (
//     <ThemedLayoutV2
//       Header={Header}
//       Title={(titleProps) => <ThemedTitleV2 {...titleProps} text="Refine" />}
//     >
//       {children}
//     </ThemedLayoutV2>
//   )
// }

// export default Layout
import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import Header from "./header";
import logo from './H.png'; // Ensure the logo path is correct

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
      Header={Header}
      Title={(titleProps) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}  // Use the imported logo
            alt="RH AI Billing"
            style={{ width: "60px", height: "auto", marginRight: "10px" }}  // Adjust width and margin
          />
          <span style={{ fontWeight: 'bold' }}> {/* Adjust the text styling if needed */}
            RH AI Billing
          </span>
        </div>
      )}
    >
      {children}
    </ThemedLayoutV2>
  );
};

export default Layout;


