 const { data: loans = [],
    isLoading,
    isError,} = useQuery({
    queryKey: ["allLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loans");
      return res.data;
    },
  });