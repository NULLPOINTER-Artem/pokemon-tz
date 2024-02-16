import { PropsWithChildren, useEffect, useRef, SVGProps, useState } from 'react';

type IconImportProps = PropsWithChildren<{
  'name-icon': string,
}> & SVGProps<SVGSVGElement>;

export default function IconImport(props: IconImportProps) {
  const iconRef = useRef<React.FunctionComponent<React.SVGAttributes<SVGElement>> | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoaded) {
      const importIcon = async () => {
        iconRef.current = (await import(`./../assets/icons/${props['name-icon']}.svg?svgr`)).default;
        setIsLoaded(true);
      };

      importIcon();
    }
  }, [props, isLoaded]);

  if (!iconRef.current) return null;

  return (
    <iconRef.current {...props} />
  )
}
